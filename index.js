const agent = require('superagent');
const asciify = require('asciify-image');
const dogApi = require("./dogApi")

// I renamed the function to make it more clearer that it is for a specific breed now.
// However, I still have the random breed image API address that can be supplied, which makes the function more generic. Something to think about

const getDogImageUrlFromSpecificBreed = async (url) => {
  const { body: { message: dogImageUrl }} = await agent.get(url);
  return dogImageUrl;
};

(async () => {

  // I wanted to wrap the code in a try catch block in order to catch errors in case something happens with the connection or other types.

  try {

    // I went with creating a hash table where we can store specific URLS (for example pug). The other option was just to use a normal string as argument "pug". I used the hash table as it is easier to add on new address for future uses if the application wants to change the breed (instead of always looking into documentation directly). However, creating the hash table adds more memory usage to the application.

    const dogImageUrl = await getDogImageUrlFromSpecificBreed(dogApi.PUG_ADDRESS);

    const { body: data } = await agent.get(dogImageUrl);

    const ascii = await asciify(data, {
      fit: 'box',
      width: 60,
      height: 60,
    });

    console.log(ascii);

  } catch ( e ) {
    // Did some basic error checking. I broke the request to see what response I get back, and wanted to let the person know that we failed, and show the message if there is one, instead of having an error show up.
    if (e.response.body.message) return console.log(`Program failed, this is message from server: ${e.response.body.message}`)
    console.log(`Program failed, please make sure the breed is correct.`)

  }
})();
