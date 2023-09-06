// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()
query()
function query(){
    mail = storageService.query(MAIL_KEY)
    console.log(mail)
}

function _createMail(subject, body, from, to){
    const mail={
    id: utilService.makeId ,
    subject,
    body,
    isRead: false,
    sentAt: new Date(),
    removedAt: null,
    from,
    to,
    }
    return mail
}
function _createMails(){
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length){
        mails = []
        mails.push(_createMail('start','deadadeaedaaadaedaedaedaed','test@test.com','user@appsus.com'))
        mails.push(_createMail('middle','12312312312312312312','test@test.com','user@appsus.com'))
        mails.push(_createMail('end','1o2u3n1ou23n1o2u3n1o2u3n1ou','test@test.com','user@appsus.com'))
        storageService.saveToStorage(MAIL_KEY,mails)
        
    }
}