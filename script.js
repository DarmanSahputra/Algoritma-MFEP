function ShowKriteria(){
    let tbl = document.getElementById('Tbkriteria')
    let kriteria = document.getElementById('kri')
    for(i = 1; i <= kriteria.value; i++){
        let row = tbl.insertRow()
        row.insertCell(0).innerHTML = i;
        row.insertCell(1).innerHTML = `<input type="text" placeholder="Kriteria" id="kriteria${i}">`;
        row.insertCell(2).innerHTML = `<input type="num" id="bobot${i}" placeholder="Jumlah Bobot">`
    }

    let btn = document.getElementById("btn1")
    btn.style.display = "none"
}


function penentuanNEF(){
    let iNef = parseInt(document.getElementById('nef').value)
    let tbc2 = document.getElementById('tbcard2')
    let kriteria = document.getElementById('kri')   

    let nef = document.createElement("table")
    nef.setAttribute("border", "1")
    let att = document.createAttribute("class")
    att.value = "tb2"


    let tb = nef.insertRow()
    tb.insertCell(0).innerHTML = `<th>NO</th>`
    tb.insertCell(1).innerHTML = `<th>Kriteria</th>`
    
    for(let i=1;i <= iNef; i++){
        let x = i + 1
        tb.insertCell(x).innerHTML = `<input type="text" id="headNef${i}" placeholder="Name Attribute">`
    }

    // ngambil value dari kriteria
    for(let i = 1;i <= kriteria.value; i++){
        let td = nef.insertRow()
        let nilai = document.getElementById(`kriteria${i}`).value
        td.insertCell(0).innerHTML = i;
        td.insertCell(1).innerHTML = nilai;
        for(let j = 2; j < 2 + iNef; j++){
            td.insertCell(j).innerHTML = `<input type="text" id="datanef${i}_${j}" placeholder="Isi penilaian anda">`;
        }
    }
    tbc2.appendChild(nef)
    nef.setAttributeNode(att)

    let btn = document.getElementById("btn2")
    btn.style.display = "none"
}

function generate(){
    let box = document.getElementById("container")
    let kriteria = document.getElementById('kri') 
    let iNef = parseInt(document.getElementById('nef').value)
    let ranking = []
    for(let i = 1; i <= iNef; i++){
        let nama = document.getElementById(`headNef${i}`).value
        const h1 = document.createElement("h1")
        h1.style.color = "red"
        h1.innerHTML = nama;

        const table = document.createElement("table")
        table.setAttribute('border', '1')
        table.style.margin = "10px"
        let att = document.createAttribute("class")
        att.value = "tbnef1"
        table.setAttributeNode(att)
    
        let totalnbe = 0

        let td = table.insertRow();
        td.insertCell(0).innerHTML = `<th>No</th>`
        td.insertCell(1).innerHTML = `<th>Kriteria</th>`
        td.insertCell(2).innerHTML = `<th>NBF</th>`
        td.insertCell(3).innerHTML = `<th>NEF</th>`
        td.insertCell(4).innerHTML = `<th>NBE</th>`
        
        for(let x = 1; x <= kriteria.value; x++){
            let nilaiKri = document.getElementById(`kriteria${x}`).value
            let nilaibot = document.getElementById(`bobot${x}`).value
            let data = parseInt(document.getElementById(`datanef${x}_${i+1}`).value)

            let nbe = nilaibot * data
            nbe = parseFloat(nbe.toFixed(1))
            totalnbe+=nbe

            let d = table.insertRow()
            d.insertCell(0).innerHTML = x;
            d.insertCell(1).innerHTML = nilaiKri
            d.insertCell(2).innerHTML = nilaibot
            d.insertCell(3).innerHTML = data
            d.insertCell(4).innerHTML = nbe
        }
        let lastrow = table.insertRow()
        lastrow.insertCell(0)
        let cellast = lastrow.insertCell(1)
        cellast.setAttribute("colspan", "3")
        cellast.style.fontWeight = "bold"
        cellast.innerHTML = "Total Bobot Evaluasi (TBE)"
        lastrow.insertCell(2).innerHTML = parseFloat(totalnbe.toFixed(1))

        box.appendChild(h1)
        box.appendChild(table)

        ranking.push({alternatif: nama, total: totalnbe});
    }

    let btn = document.getElementById("btn3")
    btn.style.display = "none"

    // perangkingan
    let rankcont = document.getElementById("ranking")
    const ats = document.createAttribute("class")
    ats.value = "rank"

    const tbrank = document.createElement("table")
    
    const h1 = document.createElement("h1")
    h1.innerHTML = "Rangking Data"

    let rank = tbrank.insertRow()
    rank.insertCell(0).innerHTML = "NO" 
    rank.insertCell(1).innerHTML = "Alternatif" 
    rank.insertCell(2).innerHTML = "Nilai TBE" 
    rank.insertCell(3).innerHTML = "Ranking"

    // **Mengurutkan berdasarkan Total NBE (TBE)**
    ranking.sort((a, b) => b.total - a.total);

    ranking.forEach((item, index) => {
        let dd = tbrank.insertRow();
        dd.insertCell(0).innerHTML = index + 1; 
        dd.insertCell(1).innerHTML = item.alternatif;
        dd.insertCell(2).innerHTML = item.total.toFixed(1);
        dd.insertCell(3).innerHTML = `Ranking ${index + 1}`;
    });

    rankcont.appendChild(h1);
    rankcont.setAttributeNode(ats)
    rankcont.appendChild(tbrank);
}