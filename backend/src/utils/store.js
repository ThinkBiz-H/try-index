let urls = [];

export const addUrl = (url) => {
  if (!urls.includes(url)) {
    urls.push(url);
  }
  return urls.indexOf(url); // id return karega
};

export const getUrls = () => urls;
export const getUrlById = (id) => urls[id];
