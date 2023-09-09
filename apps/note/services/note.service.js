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

function getEmptyNote(title = '', txt = '') {
    return {
        type: 'NoteTxt',
        info: {
            txt,
            title
        },
        isPinned: false,
        style: { backgroundColor: 'white' }
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
                isPinned: false,
                style: { backgroundColor: '#00d' },
                info: {
                    title: 'Movie Marathon Night:',
                    txt: 'Entire Rambo Trilogy                The Starwars Trilogy                        Harry Potter Trilogy',
                },
                style: { backgroundColor: '#aeccdc' }
            },

            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: true,
                info: {
                    imgUrl: 'https://static.boredpanda.com/blog/wp-content/uploads/2015/05/tiny-horses-19__605.jpg',
                    title: 'Bobi and I! ❤️',
                },
                style: { backgroundColor: '#e2f6d3' }
            },

            {
                id: 'n103',
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'New York Travel List:',
                    txt: '12 underwear, 5 short pants, Jean\'s, 1 suit, Toothbrush, Toothpaste, Razor blade + shaving cream, Cell phone charger + cell phone, Passports Israeli and American.',
                },
                style: { backgroundColor: '#d4e4ed' }
            },
            {
                id: 'n104',
                type: 'NoteImg',
                isPinned: true,
                info: {
                    imgUrl: 'https://www.planetware.com/wpimages/2020/02/new-zealand-in-pictures-beautiful-places-to-photograph-milford-sound.jpg',
                    title: 'Next Vacation:',
                },
                style: { backgroundColor: '#e2f6d3' }
            },

            {
                id: 'n105',
                type: 'NoteTxt',
                isPinned: false,
                info: {
                    title: 'Just so you know',
                    txt: 'Risan is a really good project manager! but Yinon is my favorite instructor!',
                },
                style: { backgroundColor: '#faafa8' }
            },
            {
                id: 'n106',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    imgUrl: 'https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif',
                    title: 'When you finish a sprint:',
                },
                style: { backgroundColor: '#fff8b8' }
            },
            {
                id: 'n107',
                type: 'NoteTxt',
                isPinned: true,
                info: {
                    title: 'REMINDER:',
                    txt: 'Start working on the final project TODAY!',
                },
                style: { backgroundColor: '#e2f6d3' }
            },

            {
                id: 'n108',
                type: 'NoteVid',
                isPinned: false,
                info: {
                    vidUrl: 'https://player.vimeo.com/video/293771277',
                    title: 'Cats are vicious Creatures🙂',
                },
                style: { backgroundColor: '#fff8b8' }
            },

        ]

        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

// function _createNote(title, price = 50) {
//     const note = getEmptyNote(title, price)
//     note.id = utilService.makeId()
//     return note
// }




