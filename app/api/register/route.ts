// import bcrypt from 'bcrypt';
// import prismadb from '../../../lib/prismadb';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return res.status(405).end(); // method not supported for this request
//     }

//     try {
//         const { name, email, password } = req.body;
//         const existingUser = await prismadb.user.findUnique({ where: { email: email } }) // check if email is already in use

//         if (existingUser) {
//             return res.status(422).json({ error: 'Email is already in use.' }); // server cannot process this request
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const user = await prismadb.user.create({
//             data: {
//                 email, // equivalent to email:email etc
//                 name,
//                 hashedPassword,
//                 image: '',
//                 emailVerified: new Date(),
//             }
//         });

//         return res.status(200).json(user);
//     } catch (error) {
//         console.log(error)
//         return res.status(400).end()
//     }
// }


import bcrypt from 'bcrypt';
import prismadb from '../../../lib/prismadb';

// Define the handler for POST requests
export async function POST(req: Request) {
    try {
        // Parse the JSON body of the request
        const { name, email, password } = await req.json();

        // Check if a user with the given email already exists
        const existingUser = await prismadb.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            // Return a 422 Unprocessable Entity response if the email is already in use
            return Response.json({ error: 'Email is already in use.' }, { status: 422 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        // Return the created user with a 200 OK response
        return Response.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        // Return a 400 Bad Request response in case of an error
        return Response.json({ error: 'Something went wrong' }, { status: 400 });
    }
}
