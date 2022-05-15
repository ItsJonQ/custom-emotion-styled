import { styled } from '../styles';

/**
 * Speed build.
 * From scratch, using only styled.
 *
 * @see https://www.youtube.com/watch?v=5ch94AaPZRQ
 * @time 23 minutes.
 */

const space = (value) => {
  if (typeof value !== 'number') return 4;
  return value * 4;
};

const Box = styled('div')({});

const HStack = styled('div')({
  width: '100%',
  maxWidth: `calc(100vw - calc(var(--gutter, 0) * 2))`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  overflow: 'hidden',
});

const VStack = styled('div')({
  width: '100%',
  maxWidth: `calc(100vw - calc(var(--gutter, 0) * 2))`,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Divider = (props) => (
  <Box borderBottom="1px solid #eee" height={0} width="100%" {...props} />
);

const StackItem = styled('div')({});

const Spacer = styled('div')({ flex: 1 });

const Text = styled('div')({
  fontSize: 14,
  lineHeight: 1.5,
});

const Heading = styled('div')({
  fontSize: 18,
  lineHeight: 1.2,
});

const Icon = ({ size, ...props }) => (
  <Box
    css={{ fontSize: size, width: size, height: size, lineHeight: 1 }}
    {...props}
  />
);

const Container = styled('div')({
  '--gutter': '20px',
  maxWidth: 1080,
  margin: 'auto',
  width: '100%',
  padding: '0 var(--gutter)',
});

const AspectRatio = (props) => (
  <Box
    width="100%"
    height={0}
    paddingBottom="56.25%"
    backgroundColor="#eee"
    {...props}
  />
);

const Button = (props) => (
  <Box
    backgroundColor="#eee"
    height={30}
    lineHeight="28px"
    padding="0 12px"
    border="1px solid #ddd"
    fontSize={14}
    fontWeight={500}
    {...props}
  />
);

const Navbar = (props) => (
  <Box
    borderBottom="1px solid #eee"
    minHeight={50}
    display="flex"
    alignItems="center"
  >
    <Container>
      <HStack>
        <Text lineHeight={1} fontWeight="bold" fontSize={18}>
          YouTube
        </Text>
        <Spacer />
      </HStack>
    </Container>
  </Box>
);

const AppBody = styled('div')({
  display: 'grid',
  gap: space(3),
  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr 300px',
    gap: space(8),
  },
});

const Debugger = styled('div')({
  outline: '1px solid rgba(255,0,0,0.1)',
  '*': {
    outline: '1px solid rgba(255,0,0,0.1)',
  },
});

const Avatar = ({ size = 32, ...props }) => (
  <Box
    width={size}
    height={size}
    backgroundColor="#eee"
    borderRadius={99999}
    {...props}
  />
);

const HeaderData = () => (
  <VStack gap={12}>
    <Text fontSize={12}>#태연 #TAEYEON #Killingvoice</Text>
    <Heading fontSize={18}>
      태연(TAEYEON)의 킬링보이스를 라이브로! - I,그대라는
      시,만약에,11:11,Blue,Time Lapse,Weekend,불티,사계,Gravity,INVU,너를 그리는
      시간
    </Heading>
  </VStack>
);

const MetaData = () => (
  <HStack justifyContent="flex-start" gap={12}>
    <StackItem>
      <Text opacity={0.6}>19,972,132</Text>
    </StackItem>
    <StackItem>
      <HStack>
        <Icon>👍</Icon>
        <Text fontWeight="bold">589K</Text>
      </HStack>
    </StackItem>
    <StackItem>
      <HStack>
        <Icon>👎</Icon>
        <Text fontWeight="bold">DISLIKE</Text>
      </HStack>
    </StackItem>
    <StackItem>
      <HStack>
        <Icon>📲</Icon>
        <Text fontWeight="bold">SHARE</Text>
      </HStack>
    </StackItem>
    <StackItem>
      <HStack>
        <Icon>⬇️</Icon>
        <Text fontWeight="bold">DOWNLOAD</Text>
      </HStack>
    </StackItem>
    <StackItem>
      <HStack>
        <Icon>✂️</Icon>
        <Text fontWeight="bold">CLIP</Text>
      </HStack>
    </StackItem>
  </HStack>
);

const SidebarVideo = () => {
  return (
    <HStack alignItems="flex-start">
      <StackItem width="120px">
        <AspectRatio />
      </StackItem>
      <Spacer>
        <VStack gap={0}>
          <Text fontSize={12}>
            멜로망스(MeloMance)의 킬링보이스를 라이브로! - 인사, 동화, 입맞춤,
          </Text>
          <Text fontSize={10} opacity={0.6}>
            dingo music
          </Text>
          <Text fontSize={10} opacity={0.6}>
            1.2M views
          </Text>
        </VStack>
      </Spacer>
    </HStack>
  );
};

export default function Page() {
  return (
    <>
      <VStack gap={8}>
        <Navbar />
        <Container>
          <AppBody>
            <VStack>
              <AspectRatio />
              <HeaderData />
              <MetaData />
              <Divider />
              <VStack gap={32}>
                <HStack alignItems="flex-start">
                  <Avatar />
                  <Spacer>
                    <VStack>
                      <VStack>
                        <Text>
                          딩고 뮤직 / <strong>dingo music</strong>
                        </Text>
                        <Text opacity={0.6} fontSize={12}>
                          3.7M subscribers
                        </Text>
                      </VStack>
                      <Text>
                        행복해지는 이번 킬보…🤭
                        <br />
                        마음의 준비 단단히하고… 들으시길…
                      </Text>
                      <Text size={11} opacity={0.6}>
                        SHOW MORE
                      </Text>
                    </VStack>
                  </Spacer>
                  <StackItem>
                    <Button>SUBSCRIBE</Button>
                  </StackItem>
                </HStack>
                <Divider />
                <HStack>
                  <StackItem>
                    <Text>40,876 Comments</Text>
                  </StackItem>
                  <Spacer>
                    <HStack>
                      <Text>Sort by</Text>
                    </HStack>
                  </Spacer>
                </HStack>
              </VStack>
              <HStack>
                <Avatar />
                <Spacer>
                  <Text opacity={0.6}>Add comment...</Text>
                </Spacer>
              </HStack>
            </VStack>
            <VStack gap={16}>
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
              <SidebarVideo />
            </VStack>
          </AppBody>
        </Container>
      </VStack>
    </>
  );
}
