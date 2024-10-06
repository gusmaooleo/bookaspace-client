import { GenericSubpage } from "@/utils/interfaces/GenericSubpage";
import { Header } from './HeaderSubpageComponent'
import { ItemCell } from "./ItemCellSubpageComponent";
import "./index.css";
import { ActionsSubpageComponent } from "./ActionsSubpageComponent";

interface GenericSubpageProps {
  value: string;
  _id?: number | string;
  status?: string;
  genericItem: GenericSubpage[];
}

const GenericSubpageComponent = ({
  value,
  _id,
  status,
  genericItem,
}: GenericSubpageProps) => {
  return (
    <div className="p-20">
      <Header 
        value={value}
        _id={_id}
        status={status}   
      />
      <div className="h-full pt-10 px-4">
        <div className="table-container">
          {genericItem.map((item, index) => item.description ? (
            <div key={index}>
              <ItemCell
                title={item.title}
                description={item.description}
                type={item.type}
                link={item.link}
                username={item.username}
              />
            </div>
          ): <div className="hidden"></div>)}
        </div>
      </div>
      <ActionsSubpageComponent 
      
      />
    </div>
  );
};

export default GenericSubpageComponent;
