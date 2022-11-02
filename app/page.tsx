import CreateMessage from './createMessage';
import styles from './page.module.css'

type Message = {
  _id: string,
  message: string
}

async function getMessages() {
  const res = await fetch('http://localhost:3000/api/message/find-all', { cache: 'no-store'});
  return res.json();
}

export default async function Home() {
  const messages: Message[] = await getMessages();
  console.log(messages);
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
         Project 3: CRUD
        </h1>

        <CreateMessage />
        <h3>Messages:</h3>

        {
          messages.map(msg => (<div key={msg._id}>
          <p>{msg.message}</p>
          </div>))
        }

      </main>
    </div>
  )
}
