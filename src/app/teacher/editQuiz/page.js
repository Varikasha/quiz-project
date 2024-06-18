"use client";
import Link from 'next/link';

import {Breadcrumbs, Typography} from "@mui/material";
import EditTable from "@/app/components/EditTable";

export default function editQuiz() {
    return (
        <div>
            <div className="container">
                <div style={{padding: 15, backgroundColor: "white", width: "fit-content", marginTop: 60, borderRadius: 7}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Главная
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/teacher/"
                        >
                            Учитель
                        </Link>
                        <Typography color="#039be5">Редактировать</Typography>
                    </Breadcrumbs>
                </div>
                <EditTable />
            </div>
        </div>
    );
}