import User from "../models/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
  const { password, ...user } = req.body
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt)
  const newUser = new User({ password: hashPassword, ...user })

  try {
    const savedUser = await newUser.save()  
    res.status(201).json(savedUser)
  }
  catch (error) {
    res.status(409).json({ message: error.message })
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password)

      if (validPassword) {
        const token = jwt.sign({
          email,
        }, process.env.SECRET_KEY)

        res.status(200).json({ token, user })
      } else {
        res.status(400).json({ message: 'Invalid credentials' })
      }
    }
    else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}