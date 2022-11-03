import React from 'react';

interface Props {
    list: string[];
    mt?: boolean;
}

const List = (props: Props) => {
    const { list, mt } = props;
    return (
        <div className={`flex flex-wrap gap-2 ${mt && `mt-5`}`}>
            {list.map((item) => (
                <p
                    key={item}
                    className='text-gray-400 text-sm hover:underline cursor-pointer'
                >
                    {item}
                </p>
            ))}
        </div>
    );
};

export default List;
