function uploadFile() {
    var form = document.getElementById("uploadForm");
    var fileInput = document.getElementById("fileToUpload");
    var file = fileInput.files[0];
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/.netlify/functions/upload");
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById("uploadStatus").innerHTML = "File uploaded successfully!";
      } else {
        document.getElementById("uploadStatus").innerHTML = "Error uploading file.";
      }
    };
    xhr.send(file);
  }
  