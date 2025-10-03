"use client";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "@/app/globals.css";

type TextEditorProps = {
    readOnly?: boolean;
    defaultValue?: any; 
    onTextChange?: (...args: any[]) => void;
    onSelectionChange?: (...args: any[]) => void;
};

const TextEditor = forwardRef<Quill, TextEditorProps>(
    ({ readOnly = false, defaultValue, onTextChange, onSelectionChange }, ref) => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        const quillRef = useRef<Quill | null>(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            if (quillRef.current) {
                quillRef.current.enable(!readOnly);
            }
        }, [readOnly]);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const editorContainer = container.appendChild(
                container.ownerDocument.createElement("div")
            );

            const quill = new Quill(editorContainer, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        ["link", "image"],
                        ["clean"],
                    ],
                },
            });

            quillRef.current = quill;

            if (ref) {
                if (typeof ref === "function") {
                    ref(quill);
                } else {
                    (ref as React.MutableRefObject<Quill | null>).current = quill;
                }
            }

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            // quill.on(Quill.events.TEXT_CHANGE, (...args) => {
            //     onTextChangeRef.current?.(...args);
            // });

            quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
                onTextChangeRef.current?.(delta, oldDelta, source, quill);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                quillRef.current = null;
                if (ref) {
                    if (typeof ref === "function") {
                        ref(null);
                    } else {
                        (ref as React.MutableRefObject<Quill | null>).current = null;
                    }
                }
                container.innerHTML = "";
            };
        }, [ref]);

        return (
            <div
                className="rounded-md shadow-sm border border-gray-200"
                ref={containerRef}
            ></div>
        );
    }
);

TextEditor.displayName = "TextEditor";

export default TextEditor;
