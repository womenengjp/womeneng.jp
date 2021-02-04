exports.handler = (event, context, callback) => {

  if ('url' in event.queryStringParameters === false) {
    console.error("parameter 'url' is necessary!!");
    return;
  }

  const url = event.queryStringParameters.url;
  const parser = require("ogp-parser");
  parser(encodeURI(url), true).then(function(data) {
    console.log(data);
    if (!data.hasOwnProperty('title')) {
        console.error("Error getting ogp data: no ogpData returned");
        return res.json({ error: "no ogpData returned" });
    } 
    let ogpData = {};
    ogpData['siteName'] = data.title;
    for (let prop in data.ogp) {
        if (/^og:/g.test(prop)) {
            ogpData[prop.split(':')[1]] = data.ogp[prop][0];
        }
    }
    for (let prop in data.seo) {
      if (/^og:/g.test(prop)) {
          ogpData[prop.split(':')[1]] = data.seo[prop][0];
      }
    }
    console.log(JSON.stringify(ogpData));
    callback(null, {
      statusCode: 200,
      "headers": { "Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(ogpData)
    });
  }).catch(function(error) {
      console.error(error);
  });

};
