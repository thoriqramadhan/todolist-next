import { TagsContainer } from '@/components/client/container';
import { getTags } from '@/helpers/dbHelpers';
import { FC } from 'react';

interface PageProps {

}

const Page: FC<PageProps> = async ({ }) => {
    const tagsData = await getTags()

    return <>
        <p className='text-title'>Tags</p>
        <TagsContainer tagsData={tagsData} />
    </>
}

export default Page;