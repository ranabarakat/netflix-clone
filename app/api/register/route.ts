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
