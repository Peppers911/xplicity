import { first } from "lodash";
import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { analysisForFile, analysisForUrl } from "../../store/analysis/analysis-thunks";
import { RootState } from "../../store/default";
import './parser.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Parser(): JSX.Element {
    const dispatch = useDispatch();
    const analysis = useSelector((state: RootState) => state.analysis);
    const history = useHistory();
    const query = useQuery();

    let stateUrl = query.get('url') || "";
    if (analysis.source?.type == "url")
        stateUrl = analysis.source.value;

    const [url, setUrl] = useState(decodeURIComponent(stateUrl));
    const [file, setFile] = useState<File>();

    useEffect(() => { url && dispatch(analysisForUrl(url)) }, [dispatch, url]);
    useEffect(() => { file && dispatch(analysisForFile(file)) }, [dispatch, file]);
    useEffect(() => { url && history.push(`/analysis?url=${encodeURIComponent(url)}`) }, [history, url]);

    return (
        <>
            <Row className="source-selector">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Parse file</Card.Title>
                            <input type="file" key={file?.name} accept="text/html, text/xml" onChange={e => setFile(first(e.target.files))} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Parse url</Card.Title>
                            <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {analysis.tagOccurances && (<Row>
                Source: {analysis.source?.type}({analysis.source?.value})
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tag</th>
                            <th>Count</th>
                            <th>LongestPath</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analysis.tagOccurances.map((item, index) => (
                            <tr key={item.key}>
                                <td>{item.key}</td>
                                <td colSpan={index == 0 ? 1 : 2}>{item.value}</td>
                                {index == 0 && (<td>{analysis.longestMostCommonTagPath?.path}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>)}
            {analysis.error && (<Alert variant="danger">{analysis.error}</Alert>)}
        </>);
}

export default Parser;