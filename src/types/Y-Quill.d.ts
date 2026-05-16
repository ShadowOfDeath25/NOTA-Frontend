
import 'y-quill'

declare module 'y-quill' {
    interface QuillBinding {
        destroy(): void
    }
}