//Utils
import {
  GRAPHQL_FILE_ENDPOINT,
  GRAPHCOOL_PROJECT_ID,
  GRAPHQL_IMAGE_ENDPOINT
} from "../../constants/Utils";

const UPLOAD_PHOTO_FUNC = (localUri, filename) => {
  const formData = new FormData();
  const data = {
    uri: localUri,
    name: `${filename}.jpg`,
    type: "image/jpeg"
  };

  formData.append("data", data);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  };

  return fetch(GRAPHQL_FILE_ENDPOINT, options)
    .then(response => {
      return response.json();
    })
    .then(image => {
      console.log(image);
      return image;
    })
    .catch(error => {
      console.error("Error uploading image ", error);
    });
};

const GET_AVATAR_URL = (secret, size = "250x250", name) => {
  return `${GRAPHQL_IMAGE_ENDPOINT}/${GRAPHCOOL_PROJECT_ID}/${secret}/${size}/${name}`;
};

export { UPLOAD_PHOTO_FUNC, GET_AVATAR_URL };
