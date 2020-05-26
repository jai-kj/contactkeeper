const express= require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')

//@route  GET api/contacts
//@desc   Get all users of a user
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
    res.json(contacts)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  POST api/contacts
//@desc   Add a new contact
//@access Private
router.post(
  '/', 
  [
    auth,
    check('name', 'Name is Required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body
    try {
      const newContact = new Contact({
        name,
        email,
        type,
        phone,
        user: req.user.id
      })

      const contact = await newContact.save()

      res.json(contact)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route  PUT api/contacts/:id
//@desc   Update a contact
//@access Private
router.put('/:id', 
  [
    auth,
    check('name', 'Name is Required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body

    //Build a contact object
    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type

    try {
      let contact = await Contact.findById(req.params.id)

      if(!contact) return res.status(404).json({ msg: 'Contact not Found!' })

      //Make sure user owns the contact
      if(contact.user.toString() !== req.user.id){
        return res.status(401).json({ msg: 'Not Authorized to Edit this Contact!' })
      }

      contact = await Contact.findByIdAndUpdate(req.params.id,
        { $set: contactFields },
        { new: true }
      )

      res.json(contact)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route  DELETE api/contacts/:id
//@desc   Delete a contact
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id)

    if(!contact) return res.status(404).json({ msg: 'Contact not Found!' })

    //Make sure user owns the contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'Not Authorized to Edit this Contact!' })
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Contact Deleted' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router