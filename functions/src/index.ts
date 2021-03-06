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

// Make sure user documents have UIDs
export const updateDocument = functions.firestore.document('users/{uid}').onUpdate((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const previousDocument = change.before.exists ? change.before.data() : null;
    
    if (!document && !previousDocument) return null;

    return change.after.ref.update({
        uid: context.params.uid
    });
});

// Create document in database on account creation
export const createDocument = functions.auth.user().onCreate(user => {
    const collection = db.collection('users');
    const doc = collection.doc(user.uid);
    // Query for document matching user
    doc.get().then(snapshot => {
        // If no results are returned, user can be added to the database
        if (!snapshot.exists) {
            console.log('No matching documents.');
            // Create document for user
            collection.doc(user.uid).set({
                uid: user.uid,
                name: user.displayName,
                // age: undefined,
                // location: undefined,
                // description: undefined,
                imageUrl: user.photoURL
            }).then(ref => {
                console.log('Added document with ID: ', user.uid);
            }).catch(err => {
                console.log('Error adding document', err);
            });
            return;
        }
        // Else log the user's document
        console.log(doc.id, '=>', doc.get());
    }).catch(err => {
        console.log('Error getting documents', err);
    });
});

// Delete user document on account deletion
export const deleteDocument = functions.auth.user().onDelete(user => {
    const collection = db.collection('users');
    const doc = collection.doc(user.uid);
    doc.get().then(snapshot => {
        // If no document exists for user, return
        if (!snapshot.exists) {
            console.log('No database entry for user ID: ', user.uid);
            return;
        }
        doc.delete().then(res => {
            console.log('Deleted document');
        }).catch(err => {
            console.log('Error deleting document', err);
        });
    }).catch(err => {
        console.log('Error getting document', err);
    });
});
