let avatar = document.querySelector('.avatar');
let loader = document.querySelector('.loader');
let request = new Request('images/male.svg');

fetch(request)
  .then(response => response.text())
  .then(svg =>  {
    loader.insertAdjacentHTML("afterbegin", svg);

    return fetch('javascripts/config.json').then(response => response.json());
  })
  .then((config) => {

    console.log(config);

    const nodes = document.querySelectorAll('#_-_Male > g');
    console.log('inserted SVG into DOM');
    console.log('nodes', nodes);

      const face = {
        glasses: "",
        hats: "",
        beard: "",
        eyebrows: "",
        eyelids: "",
        eyes: "Eyes",
        eyes_extras: "",
        freckles: "",
        hair: "",
        mouth: "",
        mustache: "",
        nose: "",
        head: "",

        head_color: "#0f0000"
      };

      const create = () => {
        for (const name in face) {
          avatar.insertAdjacentHTML("afterBegin", `<use id="avatar_${name}" xlink:href="" />`);
        }
      };

      const update = () => {
        for (const name in face) {
          const node = avatar.querySelector(`#avatar_${name}`);
          if (node) {
            // set link to assets
            node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${face[name]}`);

            //assign color to assets
            if (name.indexOf('color') !== -1) {
              //node.querySelector()
            }
          }
        }
      };

      create();

      const gui = new dat.GUI({ load: JSON });

      gui.remember(face);

      config.controls.forEach((controls) => {
        const folder = gui.addFolder(controls.folder);

        if (controls.items) {
          controls.items.forEach((control) => {
            if (control.items) {
              folder.add(face, control.name, control.items).onFinishChange(update);
            }
            if (control.color) {
              folder.addColor(face, control.name).onFinishChange(update);
            }
          });
        }



      });

      update();


  });



