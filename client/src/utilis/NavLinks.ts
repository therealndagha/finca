
export type NavObj = {
    name: string,
    path: string
}

export const navLinks: NavObj[] = [
    {
        name: 'Branches',
        path: '/branches',

    },
    {
        name: 'Customers',
        path: '/customers'
    },
    {
        name: 'Groups',
        path: '/groups',

    },
    {
        name: 'Loans',
        path: '/loans'
    },
    {
        name: 'Staff',
        path: '/staff'
    },
    {
        name: 'Complaints',
        path: '/complaints'
    },
    {
        name: 'Loan Write Off',
        path: '/writeoff'
    }
]