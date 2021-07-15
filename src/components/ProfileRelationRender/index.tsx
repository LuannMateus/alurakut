import { Fragment, FunctionComponent } from 'react';

type ProfileRelationRenderProps = {
  title: string;
  values: Profile[];
};

type Profile = {
  title: string;
  imageUrl: string;
};

const ProfileRelationRender: FunctionComponent<ProfileRelationRenderProps> = ({
  title,
  values,
}) => {
  return (
    <>
      <h2 className="smallTitle">
        {title} ({values.length})
      </h2>
      <ul>
        {values.map((actualItem: Profile, index) => {
          return (
            <Fragment key={`profile_${actualItem.title}_${index}`}>
              <li>
                <a href={`/users/${actualItem.title}`}>
                  <img src={actualItem.imageUrl} alt="" />
                  <span>{actualItem.title}</span>
                </a>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export { ProfileRelationRender };
