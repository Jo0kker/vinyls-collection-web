type VinylPageProps = {
    params: {
        vinylId: string;
    };
};

export default function VinylPage({ params }: VinylPageProps) {
    return <>{params.vinylId}</>;
}
