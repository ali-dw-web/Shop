import Backup from './backup'
export default async function Products({params}){
        const x = await params
         return (
        <>
        <Backup id={x}/>
        </>
    )
}