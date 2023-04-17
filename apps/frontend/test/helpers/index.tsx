import { fireEvent, render, screen, within } from '@testing-library/react'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '@util/lib/firebase'
import '@locale/config'

if (process.env.NODE_ENV === 'test') {
  console.info = console.log = console.warn = console.error = () => ''
}

export const renderWithProviders = (ui: JSX.Element) => {
  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          {children}
        </FirebaseAppProvider>
      )
    })
  }
}

//TODO: workout why this cannot click on the first item in the select list
export const selectMaterialUiSelectOption = (element, optionText) => {
  // Select list is actually a button which we need to trigger to get
  // the listbox to appear with all the select "options
  const button = within(element).getByRole('button')
  fireEvent.mouseDown(button)

  // Get the listbox and all the options
  const listbox = within(screen.getByRole('presentation')).getByRole('listbox')
  const option = within(listbox).queryByText(optionText)
  // click on the option with the text we want
  fireEvent.click(option)
}
