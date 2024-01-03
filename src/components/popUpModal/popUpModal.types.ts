interface IModalProps {
    show : boolean,
    modalHeader : string,
    imageURL : string[],
    onHide : (event: {}, reason: "backdropClick" ) => void
}