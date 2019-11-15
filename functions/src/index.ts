import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();

// Create document in database on account creation
export const createDocument = functions.auth.user().onCreate(user => {
    const collection = db.collection('users');
    // Query for documents matching user
    collection.where('uid', '==', user.uid).get().then(snapshot => {
        // If no results are returned, user can be added to the database
        if (snapshot.empty) {
            console.log('No matching documents.');
            collection.add({
                uid: user.uid,
                name: user.displayName,
                // age: undefined,
                // location: undefined,
                // description: undefined,
                imageUrl: user.photoURL
            }).then(ref => {
                console.log('Added document with ID: ', ref.id);
            }).catch(err => {
                console.log('Error adding document', err);
            });
            return;
        }
        // Else log the user's document
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }).catch(err => {
        console.log('Error getting documents', err);
    });
});

// Delete user document on account deletion
export const deleteDocument = functions.auth.user().onDelete(user => {
    const collection = db.collection('users');
    collection.where('uid', '==', user.uid).get().then(snapshot => {
        // If no document exists for user, return
        if (snapshot.empty) {
            console.log('No database entry for user ID: ', user.uid);
            return;
        }
        // Else delete any matches
        snapshot.forEach(doc => {
            doc.ref.delete().then(res => {
                console.log('Deleted document');
            }).catch(err => {
                console.log('Error deleting document', err);
            });
        })
    }).catch(err => {
        console.log('Error getting documents', err);
    });
});
