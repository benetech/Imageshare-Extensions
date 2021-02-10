
window.addEventListener("DOMContentLoaded",
  function () {
    console.log("test");
    const subjList = document.getElementById("subject");

        fetch(`https://imgsdev.wpengine.com/json-api/subjects/`, {
      method: 'GET',
    }).then(response => response.json())
    .then (json => {
      const subjects = json.data
      console.log("hello from foreach subject" + subjects);

      subjects.forEach(element => {
        const option = document.createElement('option');
          option.innerText = element.attributes.name;
          option.value = element.id;
          subjList.prepend(option);
        // subjList.prepend(
        //   <option value={element.id}>{element.attributes.name}</option>
        // )
      });
    })
  }
)



