// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()


export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getMailFromSearchParams,
    getLoggedUser,
}
function query(filterBy = {}, sortBy = { read: 1 }) {
    console.log('query filter by', filterBy)
    return storageService.query(MAIL_KEY).then(mails => {
        if (sortBy.date) {
            mails.sort((mail1, mail2) => {
                if (!(mail2.sentAt - mail1.sentAt)) return mail1.isRead - mail2.isRead
                return (mail2.sentAt - mail1.sentAt) * sortBy.date
            })
        } else if (sortBy.starred) {
            mails.sort((mail1, mail2) => {
                if (!(mail2.isStarred - mail1.isStarred)) return mail1.isRead - mail2.isRead
                return (mail2.isStarred - mail1.isStarred) * sortBy.starred
            })
        } else if (sortBy.read) {
            mails.sort((mail1, mail2) => {
                if (!(mail1.isRead - mail2.isRead)) return mail2.sentAt - mail1.sentAt
                return (mail1.isRead - mail2.isRead) * sortBy.read
            })
        } else if (sortBy.subject) {
            mails.sort((mail1, mail2) => {
                if (!mail1.subject.localeCompare(mail2.subject)) return mail1.isRead - mail2.isRead
                return mail1.subject.localeCompare(mail2.subject) * sortBy.subject
            })
        }

        if (filterBy.status !== 'trash') {
            mails = mails.filter(mail => !mail.removedAt)
        }
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
        }
        if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
            mails = mails.filter(mail => mail.isRead === filterBy.isRead)
        }
        if (filterBy.isStarred !== null && filterBy.isStarred !== undefined) {
            mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
        }
        if (filterBy.status) {
            switch (filterBy.status) {
                case 'inbox':
                    mails = mails.filter(mail => mail.to === loggedInUser.email)
                    break
                case 'sent':
                    mails = mails.filter(mail => mail.from === loggedInUser.email)
                    break
                case 'trash':
                    mails = mails.filter(mail => mail.removedAt)
                    break
                case 'draft':
                    break
            }
        }
        console.log(mails)
        return mails
    })


}
function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
function getEmptyMail(
	subject = '',
	body = '',
	sentAt = '',
	from = '',
	to = '',
	isRead = false,
	isStarred = false,
	removedAt = null
) {
	return { id: '', subject, body, sentAt, from, to, isRead, isStarred, removedAt }
}


function getDefaultFilter() {
	return { status: '', txt: '', isRead: null, isStarred: null, labels: [] }
}

function _createMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt = null) {
	const mail = getEmptyMail(subject, body, sentAt, from, to, isRead, isStarred, removedAt)
	mail.id = utilService.makeId()
	return mail
}
function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('1', 'deadadeaedaaadaedaedaedaed',Date.now(), 'test@test.com','user@appsus.com',false,false ))
        mails.push(_createMail('2', '12312312312312312312',Date.now(), 'test@test.com','user@appsus.com',false,false ))
        mails.push(_createMail('3', '1o2u3n1ou23n1o2u3n1o2u3n1ou',Date.now(), 'test@test.com','user@appsus.com',false,false ))
        storageService.saveToStorage(MAIL_KEY, mails)

    }
}
function getMailFromSearchParams(searchParams = { get: () => { } }) {
    return {
        id: '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || '',
        sentAt: '',
        from: '',
        to: '',
        isRead: '',
        isStarred: '',
        removedAt: '',
    }
}
function getLoggedUser() {
    return loggedInUser
}