'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateMessage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const addMessage = async () => {
    const res = await fetch('http://localhost:3000/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message})
    })

    const data = await res.json();
    if (data.acknowledged) {
      router.refresh();
    }
    console.log(data);
  }


  return (
    <> 
      <textarea cols={40} rows={3} value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={addMessage} type='button'>Add</button>
    </>
  )
}