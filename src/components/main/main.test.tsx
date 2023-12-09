import {render, screen ,fireEvent} from "@testing-library/react"
import Main from "./main.tsx"



test("should render", () => {
  render(<Main/>);
  

})

test('Add Experience button click toggles form visibility', () =>
    { 
        render(<Main/>);
        const button = screen.getByText('Add Experience');  
        expect(screen.queryByLabelText('Country :')).not.toBeInTheDocument();
        fireEvent.click(button);  
        expect(screen.getByLabelText('Country :')).toBeInTheDocument();
});

test("Button clickable", () => {
    const changeState = jest.fn(() => {})

    const { getByText } = render(<Main/>);

    const button = getByText('Add Experience');
    button.onclick = changeState;
     
    

    fireEvent.click(button);  

    expect(changeState).toHaveBeenCalledTimes(1);
    
 })