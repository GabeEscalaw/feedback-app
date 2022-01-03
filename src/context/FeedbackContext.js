import { v4 as uuidv4 } from 'uuid' // used for unique ID
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'Hello I am currently testing',
      rating: 10,
    },
    {
      id: 2,
      text: 'This website and Im not sure if its working',
      rating: 9,
    },
    {
      id: 3,
      text: 'Lemme know if you see all of this hehe',
      rating: 7,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]) // Set feedback to an array w all the current feedback items (...feedback) and ALSO adding the new one I made (newFeedback)
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id)) // Gonna return an array minus the one we're deleting
    }
  }

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    ) // return an array by taking the current feedback array that takes in an arrow func which passes item (each feedback is item). For each one we want to run a condition where is that feedback item id equal to the item id that we want to update, IF SO, then we THEN we want to spread across the current item here and then the updated item, ELSE if it doesnt match the id, we just return the curr item
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit, // Actual piece of state that holds the item in the boolean
        deleteFeedback,
        addFeedback,
        editFeedback, // Function that runs when you click edit icon
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
