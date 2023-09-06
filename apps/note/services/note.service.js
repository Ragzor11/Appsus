import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
// note service

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getDefaultNote,
}

function query(filterBy = {}) { 
    return storageService.query(NOTE_KEY)
        .then(notes => {
            //     if (filterBy.title) {
            //       const regExp = new RegExp(filterBy.title, 'i')
            //       notes = notes.filter(note => regExp.test(note.title))
            //     }

            //     if (filterBy.price) {
            //       notes = notes.filter(note => note.listPrice.amount >= filterBy.price)
            //     }

            return notes
        })
}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    //   .then(note => {
    //     note = _setNextPrevnoteId(note)
    //     return note
    //   })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}


function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', amount = '') {
    return {
        title,
        subtitle: '',
        authors: [],
        publishedDate: 2023,
        description: '',
        pageCount: 500,
        categories: [],
        thumbnail: `assets/imgs/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: 'en',
        listPrice: {
            amount,
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

function getDefaultNote() {
    return { fullName: '', rating: '', readAt: '' }
}


function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#00d' },
                info: { txt: 'Fullstack Me Baby!' }
            },

            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: { backgroundColor: '#00d' }
            },

            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, price = 50) {
    const note = getEmptyNote(title, price)
    note.id = utilService.makeId()
    return note
}

//   function _setNextPrevNoteId(note) {
//       return storageService.query(NOTE_KEY).then((notes) => {
//           const noteIdx = notes.findIndex((currnote) => currnote.id === note.id)
//           const nextnote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
//           const prevnote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
//           note.nextnoteId = nextnote.id
//           note.prevnoteId = prevnote.id
//           return note
//         })
//     }


