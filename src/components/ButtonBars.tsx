import { Categories } from "../pages/types";

interface Props {
    updateDisplay: Function;
    selectedCategory: Categories;
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    search: string;
    handleSearch: Function;
}

function ButtonBars({ updateDisplay, selectedCategory, handleCategoryChange, search, handleSearch }: Props) {
    const catgories = Object.values(Categories);
    return (
        <>
            <div className="d-flex px-5 ">
                <button onClick={() => updateDisplay('grid')} className="btn btn-light mx-1">
                    <i className="bi-grid-3x3-gap-fill"></i>
                </button>
                <button onClick={() => updateDisplay('list')} className="btn btn-light ">
                    <i className="bi-list-ul"></i>
                </button>
                <div className="d-flex align-items-center">
                    <label className="mx-3 ">Category: </label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="form-select">
                        {
                            catgories.map(category =>
                                <option
                                    //это отправляется на сервер
                                    key={category}
                                    value={category}
                                >{category}</option>
                            )
                        }
                    </select>
                    <input
                        value={search}
                        onChange={(e) => handleSearch(e)}
                        placeholder="Search"
                        className="form-control ms-3 "
                    ></input>
                </div>
            </div>
        </>
    );
}

export default ButtonBars;