import { NextPage } from 'next';
import React from 'react';

interface Props {
    text: string;
}

const NoResults: NextPage<Props> = ({ text }) => {
    return <div>{text}</div>;
};

export default NoResults;
