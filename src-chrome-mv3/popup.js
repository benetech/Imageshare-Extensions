
window.addEventListener("DOMContentLoaded",
  function () {
    const subjList = document.getElementById("subject");
    const typeList = document.getElementById("type");
    const accList = document.getElementById("accommodation");
    const srcList = document.getElementById("source");

    fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const subjects = json.data

      subjects.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          subjList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/types/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const types = json.data

      types.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          typeList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/accommodations/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const accommodations = json.data

      accommodations.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          accList.prepend(option);
      });
    })

    fetch(`https://imgsdev.wpengine.com/json-api/sources/`, {
      method: 'GET',
    }).then(response => response.json())
      .then (json => {
      const sources = json.data

      sources.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          srcList.prepend(option);
      });
    })

  }
)



