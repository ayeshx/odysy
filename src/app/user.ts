export interface User {
    name: string,  
    email: string,
    imageUrl: string,
    id: string,
    familyName: string,
    givenName: string,
    resume: {
        experiences: string[],
        interests: string[],
        education: string[]
    },
    traits: {
        personality: string[],
        scientific: string[]
    },
    tracks: {
        completed: string[],
        ongoing: string[]
    }
  }