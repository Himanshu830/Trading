import React, { Fragment, useState } from "react";
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const Emoji = (props) => {
    const [text, setText] = useState('')

    const handleChange = e => {
        setText({ text: e.target.value })
    }

    const addEmoji = e => {
        let emoji = e.native;
        setText({
          text: text + emoji
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        postMessage(text)   //send to backend
        setText({ text: '' })  //reset input field to empty
    }

    return (
        <Fragment>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={text}
                    onChange={handleChange}
                    placeholder="Type a message here then hit ENTER"
                />
            </form>
            <div>
                <Picker onSelect={addEmoji} />
            </div>
        </Fragment>        
    )
};

export default Emoji;