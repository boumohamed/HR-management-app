import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import  MaFiche  from './MaFiche';

export default function DownloadFiche() {
    const componentRef = useRef();
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center py-2">
                <ReactToPrint
                    trigger={() => <Button variant="success">Download</Button>}
                    content={() => componentRef.current}
                />
            </div>
            <MaFiche ref={componentRef} />
        </div>
    )
}
