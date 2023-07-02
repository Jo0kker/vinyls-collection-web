import { authOptions } from '@utils/authOptions';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            session: await getServerSession(
                context.req,
                context.res,
                authOptions
            )
        }
    };
}

export default function AddVinyl() {
    return (
        <>
            <h1>add vinyls</h1>
        </>
    );
}
