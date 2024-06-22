import React from 'react'

const PrimaryButton = ({buttonElement}: {buttonElement: any}) => {
  return (
    <button
        type="button"
        className="rounded-full bg-slate-800 text-white px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {buttonElement}
      </button>
  )
}

export default PrimaryButton