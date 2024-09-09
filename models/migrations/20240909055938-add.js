export const up = async (db, client) => {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('users').updateMany(
        { gender: { $exists: false } },  // Match documents without the 'gender' field
        { $set: { gender: 'unknown' } }   // Set default value
      );
};

export const down = async (db, client) => {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('users').updateMany(
        { gender: 'unknown' },  // Match documents with the default value
        { $unset: { gender: "" } }  // Remove the 'gender' field
      );
};
