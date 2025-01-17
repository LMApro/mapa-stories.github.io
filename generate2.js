const pdf = require('pdf-write-page');
let PDF2Pic = require('pdf2pic').default;
const bodau = function(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		''
	);
	return str;
}

const writeOptions = {
    size: 20,
    colorspace: 'rgb',
    color: 0x079b83,
    fontPath: './UVNKeChuyen2.ttf'
};

const name = 'Chị Huyền';
const guests = [   
    {
        name: 'Chị Lan',
        role: 'Chị & Nam'
    },
];
const refinedGuests = guests.map(guest => ({
    ...guest,
    filename: bodau(guest.name)
}))

function getNameOffset(placeholderOffset, placeholderLength, name, scaleFactor) {
    return placeholderOffset + (placeholderLength - name.length * scaleFactor) / 2;
}

function generateSinglePdf(guest) {
    pdf({ in: 'file.pdf', out: `online-wedding-card/${guest.filename}.pdf`, pageNumber: 0 })
        .cfg(writeOptions)
        .write(getNameOffset(457, 150, guest.name, 10), 52, guest.name)
        .page(1)
        .write(getNameOffset(446, 170, guest.role, 10), 491, guest.role)
        .page(2)
        .write(getNameOffset(446, 170, guest.role, 10), 491, guest.role)
        .end();
    // convertPDFToImg(guest)
}

// function convertPDFToImg(guest) {
//     let converter = new PDF2Pic({
//     density: 100,           // output pixels per inch
//     savename: "untitled",   // output file name
//     savedir: "./wedding-images",    // output file location
//     format: "png",          // output file format
//     size: 600               // output size in pixels
//     })
 
//     // by default the first page of the pdf will be converted
//     // to image
//     converter.convert(`./online-wedding-card/${guest.filename}.pdf`)
//     .then(resolve => {
//         console.log("image converted successfully")
//     })
 
// }

function generateMultiplePdf(guests) {
    for (let i = 0; i < guests.length; i++) {
        generateSinglePdf(guests[i]);
    }
}

generateMultiplePdf(refinedGuests);