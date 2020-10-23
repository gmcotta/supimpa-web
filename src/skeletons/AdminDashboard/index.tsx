import React from 'react';

import {
  BoardTitle,
  Container,
  InstitutionsSection,
  MapContainer,
  MapFooter,
} from './styles';

const Skeleton: React.FC = () => {
  return (
    <Container>
      <BoardTitle>
        <div />
        <div>
          <span />
          <span />
        </div>
      </BoardTitle>
      <InstitutionsSection>
        <MapContainer>
          <MapFooter>
            <span />
            <div>
              <span />
              <span />
            </div>
          </MapFooter>
        </MapContainer>
        <MapContainer>
          <MapFooter>
            <span />
            <div>
              <span />
              <span />
            </div>
          </MapFooter>
        </MapContainer>
        <MapContainer>
          <MapFooter>
            <span />
            <div>
              <span />
              <span />
            </div>
          </MapFooter>
        </MapContainer>
        <MapContainer>
          <MapFooter>
            <span />
            <div>
              <span />
              <span />
            </div>
          </MapFooter>
        </MapContainer>
      </InstitutionsSection>
    </Container>
  );
};

export default Skeleton;
