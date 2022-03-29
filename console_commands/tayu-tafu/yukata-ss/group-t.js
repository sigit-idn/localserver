// group-t

document.body.style.width = 650
document.querySelectorAll('#pageShot > p').forEach((p) => p.remove());
let dls = document.querySelectorAll('#pageShot > dl')
let tGroups = [];
for (let i = 0; i < dls.length; i += 2) {
  let tGroup = document.createElement('div');
  tGroup.className = 't-group';
  if (dls[i]) tGroup.appendChild(dls[i]);
  if (dls[i + 1]) tGroup.appendChild(dls[i + 1]);
  tGroups.push(tGroup);
}

tGroups.forEach((dlDiv) => document.querySelector('#pageShot').appendChild(dlDiv));