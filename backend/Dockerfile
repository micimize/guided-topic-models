FROM tensorflow/syntaxnet

ENV JOURNALDIR=$SYNTAXNETDIR/syntaxnet/journal

RUN mkdir -p $JOURNALDIR/src

WORKDIR $JOURNALDIR

COPY ./src ./src
COPY ./data ./data
COPY ./requirements.txt ./
COPY ./wait-for-it.sh   ./
COPY ./BUILD            ./

#RUN apt-get install -y coreutils
RUN python -m pip install -r requirements.txt

CMD /bin/bash -c "bazel run analysis"
