const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  return await urls.reduce(getArnieQuote, []);
};

const getArnieQuote = async (results, url) => {
  const { status, body } = await httpGet(url);
  const { message } = JSON.parse(body);

  return [
    ...(await results),
    ...(status === 200
      ? [
          {
            'Arnie Quote': message,
          },
        ]
      : [
          {
            FAILURE: message,
          },
        ]),
  ];
};

module.exports = {
  getArnieQuotes,
};
