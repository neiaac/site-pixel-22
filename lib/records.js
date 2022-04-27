import { db } from './db';
import { doc, getDoc, /* updateDoc, setDoc, */ runTransaction } from 'firebase/firestore';
/* import participants from '../utils/emails'; */

// Don't need it anymore
/* async function writeParticipants() {
    await setDoc(doc(db, 'pixel', 'participants'), participants)
        .then(() => console.log(`Successfully created all participants' records!`))
        .catch(error => console.log('Something went wrong : ', error))
} */

async function enrollParticipant(email, enrollment) {
    try {
        await runTransaction(db, async (transaction) => {
            transaction.update(doc(db, 'pixel', 'participants'), {
                [email]: enrollment
            });
            console.log('done!');
        })
        console.log('Successfully updated bookings with user\'s ticket.');
        return true;
    } catch (e) {
        console.log('Something went wrong: ', e);
        return false;
    }
}

async function readParticipants() {
    const docSnap = await getDoc(doc(db, 'pixel', 'participants'));
    if (docSnap.exists()) {
        return docSnap.data();
    }
}

export { /* writeParticipants, */ readParticipants, enrollParticipant };