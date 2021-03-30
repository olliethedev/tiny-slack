import React from 'react'
import moment from "moment";

const Message = ({message, styles, identity, index}) => {
    return (
        <div
              className={
                styles.item +
                " " +
                (message.user.email === identity.user.email && styles.me)
              }
              key={index}
            >
              <div className={styles.info}>
                <div className={styles.name}>{message.user.name}</div>
                <div className={styles.time}>
                  {moment(message.created).format("MMM Do h:mm a")}
                </div>
              </div>
              {message.content}
            </div>
    )
}

export default Message
