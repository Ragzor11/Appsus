// mail service

import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/storage.service'


const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()


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
        mails.push(_createMail('start',utilService.makeLorem,'test@test.com','user@appsus.com'))
        mails.push(_createMail('middle',utilService.makeLorem,'test@test.com','user@appsus.com'))
        mails.push(_createMail('end',utilService.makeLorem,'test@test.com','user@appsus.com'))
        storageService.saveToStorage(MAIL_KEY,mails)
    }
}